import React from 'react';
import { useState } from 'react';
import { Modal, Button, Form} from 'react-bootstrap';
import { useAuth } from 'hooks/auth';
import { useUpdateAvatar } from 'hooks/users';
import Avatar from './Avatar';
import Swal from 'sweetalert2';

export default function EditProfile({ isOpen, onClose }) {
  const { user, isLoading: authLoading } = useAuth();
  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL,
    error: uploadError,
  } = useUpdateAvatar(user?.id);

  const [selectedFile, setSelectedFile] = useState(null);

  function handleChange(e) {
    setSelectedFile(true)
    setFile(e.target.files[0]);
  }



  if (authLoading) {
    Swal.fire({
      title: 'Loading settings...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  } else {
    Swal.close();
  }

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex align-items-center">
          <Avatar user={user} overrideAvatar={fileURL} />
          <Form.Group className="mb-3" controlId="picture">
            <Form.Label>Change avatar</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleChange}  />
          </Form.Group>
        </div>
        {uploadError && (
          <div className="text-danger my-4">{uploadError.message}</div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={!selectedFile || fileLoading}
          onClick={() => {
            updateAvatar();
          }}
        >
          {fileLoading ? 'Uploading...' : 'Save'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
