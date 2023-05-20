import React, { useState, useContext, ReactElement, useEffect } from 'react'

type SiderProps = {}
type SideContextType = {
  addSider: (render: () => ReactElement, order?: number) => void
  siders: Array<() => ReactElement>
  removeSider: (render: () => ReactElement) => void
}
export const SiderContext = React.createContext<SideContextType>({
  addSider: () => {},
  siders: [],
  removeSider: () => {},
})

export const SiderProvider: React.FC = ({ children }) => {
  const [siders, setSider] = useState<SideContextType['siders']>([])
  const addSider: SideContextType['addSider'] = (render) => {
    setSider([...siders, render])
  }
  const removeSider: SideContextType['removeSider'] = (render) => {
    const index = siders.indexOf(render)
    siders.splice(index, 1)
    setSider([...siders])
  }
  return (
    <SiderContext.Provider value={{ addSider, siders, removeSider }}>
      {children}
    </SiderContext.Provider>
  )
}

export const SiderConsumer = SiderContext.Consumer

export const useSetSider = (render: () => ReactElement) => {
  const { addSider, removeSider } = useContext(SiderContext)
  useEffect(() => {
    addSider(render)
    return () => {
      removeSider(render)
    }
  }, [])
}

const Sider: React.FC<SiderProps> = () => {
  const { siders } = useContext(SiderContext)
  if (siders.length === 0) return null
  return (
    <aside className="flex flex-col gap-4 self-stretch order-2 lg:order-3 lg:w-44">
      {siders.map((sider, index) =>
        React.cloneElement(sider(), { key: index })
      )}
    </aside>
  )
}

export default Sider
