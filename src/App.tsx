import { MouseEventHandler, useState } from 'react'
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

const transformObject = (objeto: any) => {
  const array: any = Object.entries(objeto).map((item: any) => {

    const label = item[0]
    const value = [item[0], crypto.randomUUID()]
    
    const object = { label, value }
    
    if (typeof item[1] === "object") {
      return { ...object, children: transformObject(item[1]) }
    }
    
    return { ...object }
  })
  return array;
}

const nodes = transformObject(objeto)

console.log(objeto)
console.log(nodes)

const App = () => {
  const [state, setState] = useState<StateProps>({
    checked: [],
    expanded: [],
  })
  
  const { checked, expanded } = state

  const handleClick: MouseEventHandler<HTMLButtonElement> = () =>{
    const values = Object.fromEntries(checked.map(item => item.split(",")))  
    console.log("checked:", values)
  }

  return (
    <>
    <div className="main_container">
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
      
      <button onClick={handleClick}>
        Console log checked value
      </button>
    </div>
    </>
  )
}

export default App
