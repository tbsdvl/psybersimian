/**
 * @vitest-environment jsdom
 * @vitest-environment-options {"url": "https://www.treasurydirect.gov/"}
*/
import React from 'react';
import {describe, test} from 'vitest';
import {render} from '../src/util/test';
import {screen} from '@testing-library/react';
import { Header } from '../src/components/Header';

describe('App', () => {
    test('should load the App component', async () => {
      render(<Header />);
      await screen.findByText(/Psybersimian/i);
    });
});