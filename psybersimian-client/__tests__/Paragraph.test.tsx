/**
 * @vitest-environment jsdom
 * @vitest-environment-options {"url": "https://www.treasurydirect.gov/"}
*/
import React from 'react';
import {describe, test} from 'vitest';
import {render} from '../src/util/test';
import {screen} from '@testing-library/react';
import { Paragraph } from '../src/components/Paragraph';

describe('Section', () => {
    test('should ', async () => {
      render(<Paragraph textStyle={"ibm-plex-sans-regular text-5xl text-midnight-black text-center h-screen"} text={'Coming soon...'} />);
      await screen.findByText(/Coming soon.../i);
    });
});