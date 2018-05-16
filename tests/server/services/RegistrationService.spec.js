import { RegistrationService } from '../../../src/server/services/RegistrationService'
import { UserRepository } from '../../../src/database/UserRepository'
describe('RegistrationService', () => { 
    var registrationService
    var userRepository
    beforeEach(() =>{
        userRepository = new UserRepository()
        registrationService = new RegistrationService(userRepository)
    })

    it('non existent username should be available', async () => {
        const flag = await registrationService.isUsernameAvailable('sanm3423')
        expect(flag).toEqual(true)
    })

    it('Existing username should NOT be available', async () => {
        await userRepository
            .createUser('username001', 'user@example.com', 'ajskdfjalsdf', false)
        const available = await registrationService.isUsernameAvailable('username001')
        expect(available).toBe(false)
    })

    it('should create user in database', async () => {
        const user = await registrationService.register('username002', 'user2@example.com', '012345679')
        expect(user.username).toBe('username002')
        const user2 = await userRepository.findUserByUserName('username002')
        expect(user2).toBeTruthy()
    })

    it('should fail if username already exists', async () => {
        try{
            await userRepository.createUser('username001', 'user@example.com', 'ajskdfjalsdf', false)
            const user  = await registrationService.register('username001', 'user001@example.com', 'adfasdfasdf', false)
            fail()
        }catch(error) {

        }
    })

    it('should fail if email already exists', async () => {
        const user = await registrationService.register('username002', 'user@example.com', '012345679')
        try{
            await userRepository.createUser('username001', 'user@example.com', 'ajskdfjalsdf', false)
            const user  = await registrationService.register('username001', 'user@example.com', 'adfasdfasdf', false)
            fail()
        }catch(error) {

        }
    })
})