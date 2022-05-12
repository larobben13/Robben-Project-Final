const data = {
    states: require("../model/employees.json"),
 setStates: (data) => {
  this.states = data;
  },
 };
const State = require("../model/States");

//Get all States
const getStates = async (req, res) => {
  const states = await State.find();
  if (!states)
    return res.status(400).json({ message: "No State found." });
  res.json(states);
};

//Create a State
const createNewState = async (req, res) => {
  if (!req?.body.stateCode) {
    return res.status(400).json({ message: "State Code is required" });
  }
  try {
    const result = await State.create({
      stateCode: req.body.stateCode,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
  }
};

//Update State
const updateState = async (req, res) => {
  if (!req?.body.stateCode) {
    return res.status(400).json({ message: " State Code is required. " });
  }
  const State = await State.findOne({ _stateCode: req.body.stateCode }).exec();

  if (!state) {
    return res
      .status(204)
      .json({ message: `No States match code${req.body.stateCode}` });
  }
  if (req.body?.stateCode) state.stateCode = req.body.stateCode;


  const result = await state.save();
  res.json(result);
};

//Delete State
const deleteState = async (req, res) => {
  if (!req?.body.stateCode) {
    return res.status(400).json({ message: "State Code is required. " });
  }

  const state = await State.findOne({ _id: req.body.stateCode }).exec();

  if (!state) {
    return res
      .status(204)
      .json({ message: `No State matches Code ${req.body.stateCode}` });
  }
  const result = await deleteOne({ _stateCode: req.body.stateCode });
  res.json(result);
};

//Get State
const getState = async (req, res) => {
  if (!req?.params?.stateCode) {
    return res.status(400).json({ message: "State Code is required. " });
  }

  const state= await State.findOne(
      { _stateCode: req.params.stateCode }).exec();

  if (!state) {
    return res
      .status(204)
      .json({ message: `No State matche Code ${req.params.stateCode}` });
  }
  res.json(state);
};

module.exports = {
  getStates,
  updateState,
  deleteState,
  createNewState,
  getState,
};