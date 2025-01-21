import { render, RenderOptions } from '@testing-library/react'
import { PreloadedState } from 'redux'

import { AppStore, RootState, configuraStore } from '../store'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export function renderizaComProvider(
  elemento: React.ReactElement,
  {
    preloadedState = {},
    store = configuraStore(preloadedState),
    ...opcoesAdicionais
  }: ExtendedRenderOptions = {}
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  function Encapslador({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }
  return {
    store,
    ...render(elemento, { wrapper: Encapslador, ...opcoesAdicionais })
  }
}
