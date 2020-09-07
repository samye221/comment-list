import {getList, updateList, addComment} from './api';

describe('getList()', () => {
    it('should return a comment list', () => {
        getList(async (response) => {
            expect(await response).toBe('blablabla')
        })
    })
})

describe('updateList()', () => {
    it('should return a comment list', () => {
        updateList(async (response) => {
            expect(await response).toBe('blablabla')
        })
    })
})