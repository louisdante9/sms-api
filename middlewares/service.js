import { response } from './validation'
class Serivice {
  async getAll(req, res) {
    try {
      const result = await this.model.findAll();

      return response(res, 200, { message: 'Success', result });
    } catch (error) {
      return response(res, 500, { error });
    }
  }

  async get(req, res, next) {
    const { id } = req;

    try {
      const result = await this.model.findOne({
        where: { [this.key || 'id']: id },
      });

      if (!result) {
        return response(res, 404, { error: `${this.name} not found` });
      }

      req[this.name] = result;
      return next();
    } catch (error) {
      return response(res, 500, { error });
    }
  }

  async delete(req, res) {
    try {
      await req[this.name].destroy();
      return response(res, 200, {message: "Deleted successfully"});
    } catch (error) {
      return response(res, 500, { error });
    }
  }
}

export default Serivice;