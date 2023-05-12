import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CheckboxTree from 'react-checkbox-tree'
// import crypto from "crypto"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faChevronDown, faChevronRight, faFolder, faFolderOpen, faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faFile } from '@fortawesome/free-regular-svg-icons'

type StateProps = {
  checked: string[],
  expanded: string[],
}

const objeto = {
  pages: {
    news_editor: crypto.randomUUID(),
    news_item: crypto.randomUUID(),
    news_card: crypto.randomUUID(),
  },
  icons: {
    bell: crypto.randomUUID(),
    heart: crypto.randomUUID(),
    home: crypto.randomUUID(),
    success: crypto.randomUUID(),
  },
  widgets: {
    modals: {
      confirm_modal: crypto.randomUUID(),
      notification_modal: crypto.randomUUID(),
      port: crypto.randomUUID(),
    },
    anchor: crypto.randomUUID(),
    footer: crypto.randomUUID(),
    header: crypto.randomUUID(),
    home: crypto.randomUUID(),
  },
  app: crypto.randomUUID(),
  index: crypto.randomUUID(),
  document: crypto.randomUUID(),
}

// for (const key in objeto) {
//   obj
// }


const transformObject = (objeto: any, string = "") => {
  const array: any = Object.entries(objeto).map((item: any) => {

    const label = `${string}${string ? "-" : ""}${item[0]}`
    
    if (typeof item[1] === "object") {
      return { label: item[0], value: crypto.randomUUID(), children: transformObject(item[1], label) }
    }
    
    return { label, value: `${label}-[${item[1]}]` }
  })
  return array;
}


const nodes = transformObject(objeto)

console.log(objeto)
console.log(nodes)

const App = () => {
  const [count, setCount] = useState(0)

  const [state, setState] = useState<StateProps>({
    checked: [],
    expanded: [],
  })

  const { checked, expanded } = state

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div className="checkboxTree">
        <h5 className="title">Filtro de productos</h5>
        <CheckboxTree
          nodes={nodes}
          checked={checked}
          expanded={expanded}
          onCheck={checked => setState({ ...state, checked })}
          onExpand={expanded => setState({ ...state, expanded })}
          icons={{
            check: <FontAwesomeIcon icon={faCheckSquare} />,
            uncheck: <FontAwesomeIcon icon={faSquare} />,
            halfCheck: <FontAwesomeIcon icon={faCheckSquare} />,
            expandClose: <FontAwesomeIcon icon={faChevronRight} />,
            expandOpen: <FontAwesomeIcon icon={faChevronDown} />,
            expandAll: <FontAwesomeIcon icon={faPlusSquare} />,
            collapseAll: <FontAwesomeIcon icon={faMinusSquare} />,
            parentClose: <FontAwesomeIcon icon={faFolder} />,
            parentOpen: <FontAwesomeIcon icon={faFolderOpen} />,
            leaf: <FontAwesomeIcon icon={faFile} />
          }}
        />
      </div>

      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
