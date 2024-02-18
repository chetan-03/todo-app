import User from '../model/user'
import connectToDatabase from '../mongoDB'

export default async function getUser(values) {
    try {
        connectToDatabase()
    }
    catch (e) {
        console.log('Error connecting to database: ', e);
    }
    const { email, password } = values
    const user = await User.findOne({ email: email, password: password }, 'email firstname lastname')
        .catch(e => e)
    console.log(user)
    return user

}