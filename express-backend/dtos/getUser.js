export default function getUserDTO(data) {
    return {
        _id: data._id,
        name: data.name?.trim(),
        username: data.username?.trim(),
        frineds: data.friends,
    };
}