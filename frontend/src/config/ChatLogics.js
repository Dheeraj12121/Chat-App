export const getSender = (loggedUser, users) => {
  return user[0]._id === loggedUser._id ? user[1].name : user[0].name;
};

export const getSenderFull = (loggedUser, users) =>{
  return user[0]._id === loggedUser._id ? user[1] : user[0].name;
}