import { Dialog } from '../components/Dialog';
import { useDialog } from '../hooks/useDialog';
import { useNavigate } from 'react-router-dom';

export const DialogDemo = () => {
  const confirmDialog = useDialog();
  const detailsDialog = useDialog();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-bold text-blue-600">
        Dialog Component Demo
      </h1>

      <div className="flex gap-4">
        <button
          className="bg-red-500 text-white px-6 py-2 rounded cursor-pointer"
          onClick={confirmDialog.open}
        >
          Open Confirmation Dialog
        </button>

        <button
          className="bg-green-500 text-white px-6 py-2 rounded cursor-pointer"
          onClick={detailsDialog.open}
        >
          Open Details Dialog
        </button>
      </div>

      <Dialog
        isOpen={confirmDialog.isOpen}
        onClose={confirmDialog.close}
        isModal={true}
        header={
          <h2 className="text-xl font-semibold text-center">Confirm Action</h2>
        }
        body={
          <p className="text-gray-600 text-center">
            Are you sure you want to remove this team?
          </p>
        }
        footer={
          <div className="flex justify-center gap-4">
            <button
              className="px-4 py-2 rounded bg-gray-300"
              onClick={confirmDialog.close}
            >
              No
            </button>
            <button
              className="px-4 py-2 rounded bg-red-500 text-white"
              onClick={() => {
                confirmDialog.close();
                alert('Deleted');
              }}
            >
              Yes
            </button>
          </div>
        }
      />

      <Dialog
        isOpen={detailsDialog.isOpen}
        onClose={detailsDialog.close}
        isModal={false}
        header={<h2 className="text-2xl font-bold">Custom HTML Popup</h2>}
        body={
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-md">
              <img
                className="w-full rounded shadow-md"
                src="https://picsum.photos/600/400"
                alt="Main"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[...Array(8)].map((_, idx) => (
                <div key={idx} className="w-20 h-20">
                  <img
                    className="w-full h-full object-cover rounded shadow"
                    src={`https://picsum.photos/150/150?random=${idx + 1}`}
                    alt={`Thumbnail ${idx + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        }
      />
      <button
        className="bg-red-500 text-white py-2 px-4 rounded shadow cursor-pointer hover:bg-red-600 transition"
        onClick={() => navigate('/')}
      >
        Home
      </button>
    </div>
  );
};
