export const useId = (req, param) => {
    return param
    ? {[param]: req.params.id || req.user._id}
    : {_id: req.params.id || req.user._id};
  };
