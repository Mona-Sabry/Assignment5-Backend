import userModel from "../../DB/model/user.model.js";

export async function signup(userData) {
  const user = userModel.build(userData);
  await user.save();
  return user;
};


export async function update(id, userData) {
  const user = await userModel.findByPk(id);
  if (user) {
    await user.update(userData, {
      where: { id },
      validate: false,
    });
    return await userModel.findByPk(id);
  }
  const newUser = userModel.build({ id, ...userData });
  await newUser.save({
    validate: false,
  });
  return newUser;
};


export async function findUser(email) {
  const user = await userModel.findOne({ where: { email } });
  if (!user) {
    throw new Error("No user found");
  }
  return user;
};


export async function getUser(id) {
  const user = await userModel.findByPk(id, {
    attributes: { exclude: ["role"] },
  });
  if (!user) {
    const error = new Error("No user found");
    error.status = 404;
    throw error;
  }
  return user;
};
