/**
 * @vitest-environment jsdom
 * @vitest-environment-options {"url": "https://www.treasurydirect.gov/"}
*/
import React from 'react';
import {describe, test} from 'vitest';
import {render} from '../src/util/test';
import {screen} from '@testing-library/react';
import { Card } from '../src/components/Card';

describe('Card', () => {
    test('should load the Card component', async () => {
      render(<Card />);
      await screen.findByText(/Test/i);
    });
});