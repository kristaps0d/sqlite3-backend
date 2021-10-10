export default function Schema(sequelize, DataTypes) {
    const Module = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    })
    return Module;
}