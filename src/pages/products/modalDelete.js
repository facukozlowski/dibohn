import React, { useState, useEffect } from "react";
import { Button, Header, Image, Modal } from 'semantic-ui-react'

const ModalDelete = ({ products }) => {
const [open, setOpen] = useState(false)


  const deleteProduct = async () => {
    try {
      await fetch(`http://localhost:3000/api/products/${products._id}`, {
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
    await deleteCategory();
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
            Se eliminara el siguiente producto: {products.name}, desea continuar?
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Cancelar
        </Button>
        <Button color='negative' onClick={() => deleteProduct()}>
          Eliminar
        </Button>
      </Modal.Actions>
    </Modal>



    
    <div class="ui buttons" style={{ padding: "0.5rem" }}>
                <button
                  class="ui red basic button"
                  onClick={() => setOpen(true)}
                >
                  Eliminar
                </button>
              </div>
    </>
  )
};



export default ModalDelete;