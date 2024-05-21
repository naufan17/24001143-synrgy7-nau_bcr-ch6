import Spec from '../models/Spec';

class SpecRepository {
    async create(
        id: string, 
        spec: string
    ){
        if (Array.isArray(spec)) {
            return await Promise.all(spec.map((sp: string) => 
                Spec.query().insert({
                    car_id: id,
                    spec: sp
                })
            ));
        } else {
            return await Spec.query().insert({
                car_id: id,
                spec
            })
        }
    }

    async update(
        id: string, 
        spec: string
    ){
        await this.delete(id)
        if (Array.isArray(spec)) {
            return await Promise.all(spec.map((sp: string) => 
                Spec.query().insert({ 
                    car_id: id,
                    spec: sp 
                })
            ));
        } else {
            return await Spec.query().insert({ 
                car_id: id,
                spec 
            });
        }
    }

    async delete(id: string){
        return await Spec.query().where('car_id', id).delete();
    }
}

export default new SpecRepository();