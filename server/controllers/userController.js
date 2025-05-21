const User = require("../models/User")

// Function to retrieve all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().lean().select('password')
    res.status(200).json(users)
    console.log(req.user)
  }
  catch (error) {
    console.error(error)
    res.status(500).json({ msg: "Server error, Unable to fetch users" })
  }
}


// פונקציה להגרלת מספר בין min ל-max (כולל)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//לא שימושי כעת 
// יצירת משתמש חדש עם הגרלה ל-START, END, ו-CURRENT = START
const createUser = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      res.status(400).json({ msg: "Name field is required." })
    }
    const start = getRandomNumber(0, 99);
    const end = getRandomNumber(100, 150);
    const user = new User({
      name,
      start,
      end,
      current: start,
    });
    const newUser = await user.save();
    res.status(201).json({message:`New user create ${newUser}`});

  } catch (err) {
    res.status(400).json({error: `error createUser: ${err.message}`});
  }
};

// פונקציה המחזירה את ה-START ו-END של משתמש לפי ID
const getEndAndStart = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('start end');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ start: user.start, end: user.end });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Function to create a new user
// const createUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body
//     if (!name || !email || !password) {
//       res.status(400).json({ msg: "All fields are required." })
//     }
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists.' });
//     }

//     const newUser = await User.create({ name, email, password });
//     const result = await User.find()
//     res.status(200).json({ result })
//   }
//   catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error.' });
//   }
// }

// Function to retrieve a specific user by its ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Function to update an existing user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json({ message: 'User updated successfully.', user: updatedUser });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

// Function to delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getEndAndStart
}

