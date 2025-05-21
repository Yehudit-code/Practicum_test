const User = require("../models/User")
const Play = require("../models/Play")
const userController = require("../controllers/userController")

// פונקציה להגרלת מספר בין min ל-max (כולל)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// פונקציית התחלת משחק - יצירת שני שחקנים והמשחק
const startGame = async (req, res) => {
    try {
        const { name1, name2 } = req.body;

        if (!name1 || !name2) {
            return res.status(400).json({ msg: "Both name1 and name2 are required." });
        }

        // יצירת שחקן 1
        const start1 = getRandomNumber(0, 99);
        const end1 = getRandomNumber(100, 150);
        const user1 = new User({
            name: name1,
            start: start1,
            end: end1,
            current: start1,
        });
        const player1 = await user1.save();

        // יצירת שחקן 2
        const start2 = getRandomNumber(0, 99);
        const end2 = getRandomNumber(100, 150);
        const user2 = new User({
            name: name2,
            start: start2,
            end: end2,
            current: start2,
        });
        const player2 = await user2.save();
        player1.active = true;   // השחקן הראשון מתחיל
        player2.active = false;  // השני ממתין
        await player1.save();
        await player2.save();
        // יצירת משחק חדש עם שני השחקנים
        const newGame = new Play({
            player1: player1._id,
            player2: player2._id
        });
        const savedGame = await newGame.save();

        // מחזיר את המשחק שנוצר ואת נתוני השחקנים
        res.status(201).json({
            message: "Game started successfully",
            game: savedGame,
            players: {
                player1,
                player2
            }
        });
    } catch (err) {
        res.status(400).json({ error: `error startGame: ${err.message}` });
    }
};
//פונקצית המשחק
const play = async (req, res) => {
    try {
        const { id } = req.params; // id של המשחק (Play)
        const { player, action } = req.body; // player: 'player1' או 'player2', action: '+1', '-1', '*2', '/2'

        const play = await Play.findById(id).populate('player1').populate('player2');
        if (!play) return res.status(404).json({ error: 'משחק לא נמצא' });

        // קבע מי השחקן הפעיל ומי לא
        const me = player === "player1" ? play.player1 : play.player2;
        const other = player === "player1" ? play.player2 : play.player1;

        if (!me.active) {
            return res.status(403).json({ error: 'לא תורך' });
        }

        // בצע פעולה
        let newVal = me.current;
        switch (action) {
            case '+1': newVal += 1; break;
            case '-1': newVal -= 1; break;
            case '*2': newVal *= 2; break;
            case '/2': newVal = Math.floor(newVal / 2); break;
            default: return res.status(400).json({ error: 'פעולה לא חוקית' });
        }
        me.current = newVal;
        me.steps += 1;

        // בדוק ניצחון
        let winner = null;
        if (me.current === me.end) {
            winner = me.name;
            // winnerSteps = me.steps;
            me.active = false;
            other.active = false;
        } else {
            // הפעל-נטרל תור
            me.active = false;
            other.active = true;
        }

        await me.save();
        await other.save();

        // שלח תשובה
        res.json({
            message: winner ? `${winner} ניצחה! ` : 'המהלך בוצע בהצלחה',
            players: {
                player1: await User.findById(play.player1._id),
                player2: await User.findById(play.player2._id)
            },
            winner
        });
    } catch (err) {
        res.status(500).json({ error: "שגיאת שרת" });
    }
}


module.exports = { startGame,play }