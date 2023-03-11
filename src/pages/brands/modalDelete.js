import React, { useState, useEffect } from "react";
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const ModalDelete = ({ brand }) => {
const [open, setOpen] = useState(false)


  const deleteBrand = async () => {
    try {
      await fetch(`http://localhost:3000/api/brands/${brand._id}`, {
        method: "DELETE",
      });
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  /* const open = () => setConfirm(true);
  const close = () => setConfirm(false);

    const handleDelete = async () => {
    setIsDeleting(true);
    await deleteBrand();
    push("/");
    close();
  }; */

  return (
    <>
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Alerta!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <p>
            Se borrara la marca {brand.name}, quiere continuar?
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition='right'
          icon='checkmark'
          onClick={() => deleteBrand()}
          positive
        />
      </Modal.Actions>
    </Modal>



    
    <div class="ui buttons" style={{ padding: "0.5rem" }}>
                <button
                  class="ui inverted red button"
                  onClick={() => setOpen(true)}
                >
                  Eliminar
                </button>
              </div>
    </>
  )
};



export default ModalDelete;