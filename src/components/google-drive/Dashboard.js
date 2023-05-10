import React from 'react'
import NavbarComponent from './Navbar'
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import AddFolderButton from './AddFolderButton'
import { useFolder } from '../../hooks/useFolder'
import Folder from './Folder'
import File from './File'
import { useParams,useLocation } from "react-router-dom"
import FolderBreadcrumbs from './FolderBreadcrumbs'
import AddFileButton from './AddFileButton'


export default function Dashboard() {
  const { folderId } = useParams()
  const { state = {} } = useLocation()
  // const {folder,childFolders}=useFolder(folderId,state.folder)
  const { folder, childFolders,childFiles } = useFolder(folderId, state !== null ? state.folder : undefined);

  console.log(state)
  return (
    <div>
      <NavbarComponent/>
      <Container fluid>
        <div className="d-flex align-items-center">
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFileButton currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolder => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFiles.map(childFile => (
              <div
                key={childFile.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <File file={childFile} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
} 