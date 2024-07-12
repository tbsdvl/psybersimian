/**
 * @vitest-environment jsdom
 * @vitest-environment-options {"url": "https://www.treasurydirect.gov/"}
*/
import React from 'react';
import {describe, expect, test} from 'vitest';
import {render} from '../src/util/test';
import {screen} from '@testing-library/react';
import { Section } from '../src/components/Section';
import { Paragraph } from '../src/components/Paragraph';

describe('Section', () => {
    test('should render a section with paragraphs', async () => {
    const sectionComponent = <Section style={'bg-ivory'}>
            <Paragraph textStyle={"ibm-plex-sans-regular text-5xl text-midnight-black text-center h-screen"} text={'Coming soon...'} />
            <Paragraph textStyle={"ibm-plex-sans-regular text-5xl text-midnight-black text-center h-screen"} text={'Coming soon...'} />
            <Paragraph textStyle={"ibm-plex-sans-regular text-5xl text-midnight-black text-center h-screen"} text={'Coming soon...'} />
        </Section>;
      render(sectionComponent);
      const paragraphs = await screen.findAllByText(/Coming soon.../i);
      expect(paragraphs.length === 3);
    });
});