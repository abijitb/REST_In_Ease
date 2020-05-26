module.exports = ( data ) => {
    return {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email || null,
        phone_number: data.phone_number,
        image: data.image || null,
    };
};
