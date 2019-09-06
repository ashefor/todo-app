import { InMemoryDbService } from "angular-in-memory-web-api";

export class FakeTodoBackendService implements InMemoryDbService {
    createDb() {
        let todo = [
            {
                id: 1,
                description: 'Wash the car'
            },
            {
                id: 2,
                description: 'Buy groceries'
            },
            {
                id: 3,
                description: 'Buy ejanla'
            }
        ]
        return {
            todo
        }
    }
} 