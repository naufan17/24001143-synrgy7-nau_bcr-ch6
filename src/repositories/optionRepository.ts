import Option from '../models/Option';

class OptionRepository {
    async create(
        id: string, 
        option: string,
    ){
        if (Array.isArray(option)) {
            return await Promise.all(option.map((opt: string) => 
                Option.query().insert({
                    car_id: id,
                    option: opt
                })
            ));
        } else {
            return await Option.query().insert({
                car_id: id,
                option
            })
        }
    }

    async update(
        id: string, 
        option: string,
    ){
        await this.delete(id)
        if (Array.isArray(option)) {
            return await Promise.all(option.map((opt: string) => 
                Option.query().insert({ 
                    car_id: id,
                    option: opt 
                })
            ));
        } else {
            return await Option.query().insert({ 
                car_id: id,
                option 
            });
        }
    }

    async delete(id: string){
        return await Option.query().delete().where('car_id', id);
    }
}

export default new OptionRepository();