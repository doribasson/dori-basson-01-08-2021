const Modal = ({ removeAll }) => {
  return (
    <div className="favorite-warnning">
      <button
        type="button"
        className="btn btn-light btn-lg"
        data-toggle="modal"
        data-target="#myModal"
      >
        <span className="fa fa-trash" style={{ fontSize: "20px" }}></span>{" "}
        Delete all favorites
      </button>

      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close1" data-dismiss="modal">
                &times;
              </button>
              <h4 className="modal-title">Warnning</h4>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete all your favorites?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-info"
                data-dismiss="modal"
                onClick={removeAll}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
