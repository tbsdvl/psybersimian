import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'

const Wrapper = ({children}: {children: React.ReactNode}) => {
  return (
    <>
        {children}
    </>
  );
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: Wrapper, ...options})

export * from '@testing-library/react'
export {customRender as render}