const echo = (parent, args, context, info) => {
    const {msg} = args;
    return `${msg}`;
}

module.exports = {
    echo
};
