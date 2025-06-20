const { Branch } = require('../models');

exports.getBranchById = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findByPk(id);
    if (!branch) return res.status(404).json({ error: 'Sucursal no encontrada' });
    res.status(200).json(branch);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la sucursal' });
  }
};