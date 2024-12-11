
import React, { useState } from "react";
  
 function DialogModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && <DialogModal setShowModal={setShowModal} />}
    </div>
  );
}

export default DialogModal;


// import React, { useState } from 'react';

// function CloseDialogBox({ onClose }) {
//     return (
//         <div>
//             <button onClick={onClose}>Close</button>
//         </div>
//     );
// }

// export default CloseDialogBox;