import Car from '../models/Car';

class CarRepository {
    async findAll() {
        return await Car.query().withGraphFetched('[rents]');
    }

    async findById(id: string) {
        return await Car.query().findById(id).withGraphFetched('[rents, options, specs]');        
    }

    async create(
        id: string, 
        plate: string,
        manufacture: string,
        model: string,
        image: string,
        capacity: number,
        description: string,
        transmission: string,
        type: string,
        year: number,
    ){
        return await Car.query().insert({
            id: id,
            plate,
            manufacture,
            model,
            image,
            capacity,
            description,
            transmission,
            type,
            year
        });
    }

    async update(
        id: string, 
        plate: string,
        manufacture: string,
        model: string,
        image: string,
        capacity: number,
        description: string,
        transmission: string,
        type: string,
        year: number,
    ){
        return await Car.query().findById(id).update({
            plate,
            manufacture,
            model,
            image,
            capacity,
            description,
            transmission,
            type,
            year
        });
    }

    async delete(id: string){
        return await Car.query().deleteById(id);
    }
}

export default new CarRepository();