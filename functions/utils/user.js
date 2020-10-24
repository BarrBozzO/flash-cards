const getUserId = (user) => {
    return user.sub || null;
};

module.exports = {
    getUserId
};