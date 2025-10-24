import App from './App'
import {render} from '@testing-library/react';

describe('asd', () => {
    it('should be true', () => {
        render(<App></App>)
        expect(true).toBeTruthy();
    })
})