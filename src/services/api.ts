import { create } from 'apisauce'

export const restApi = create({
    baseURL: 'http://localhost:8080/api/v1'
});

const api = {
    getFuncionario: (funcionarioId: number) => restApi.get(`/funcionarios/${funcionarioId}`),
    getFuncionarios: () => restApi.get('/funcionarios'),

    getDependente: (dependenteId: number) => restApi.get(`/dependentes/${dependenteId}`),
    getDependentes: () => restApi.get('/dependentes'),

    getCurso: (cursoId: number) => restApi.get(`/cursos/${cursoId}`),
    getCursos: () => restApi.get('/cursos'),

    createFuncionario: (funcionario: any) => restApi.post('/funcionarios', funcionario),
    createDependente: (dependente: any) => restApi.post('/dependentes', dependente),
    createCurso: (curso: any) => restApi.post('/cursos', curso),

    updateFuncionario: (funcionario: any) => restApi.put(`/funcionarios/${funcionario.id}`, funcionario),
    updateDependente: (dependente: any) => restApi.put(`/dependentes/${dependente.id}`, dependente),
    updateCurso: (curso: any) => restApi.put(`/cursos/${curso.id}`, curso),

    deleteFuncionario: (funcionarioId: any) => restApi.delete(`/funcionarios/${funcionarioId}`),
    deleteDependente: (dependenteId: any) => restApi.delete(`/dependentes/${dependenteId}`),
    deleteCurso: (cursoId: any) => restApi.delete(`/cursos/${cursoId}`),
};

export default api;