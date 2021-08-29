import { create } from 'apisauce'

export const restApi = create({
    baseURL: 'http://localhost:8080'
});

const api = {
    getFuncionario: (funcionarioId: number) => restApi.get(`/funcionarios/${funcionarioId}`),
    getFuncionarios: () => restApi.get('/funcionarios'),

    getDependente: (dependenteId: number) => restApi.get(`/dependentes/${dependenteId}`),
    getDependentes: () => restApi.get('/dependentes'),

    getCurso: (cursoId: number) => restApi.get(`/cursos/${cursoId}`),
    getCursos: () => restApi.get('/cursos'),

    getInscricao: (inscricaoId: number) => restApi.get(`/inscricoes/${inscricaoId}`),
    getInscricoes: () => restApi.get('/inscricoes'),

    createFuncionario: (funcionario: any) => restApi.post('/funcionarios', funcionario),
    createDependente: (dependente: any) => restApi.post('/dependentes', dependente),
    createCurso: (curso: any) => restApi.post('/cursos', curso),
    createInscricao: (inscricao: any) => restApi.post('/inscricoes', inscricao),

    updateFuncionario: (funcionario: any, id: number) => restApi.put(`/funcionarios/${id}`, funcionario),
    updateDependente: (dependente: any, id: number) => restApi.put(`/dependentes/${id}`, dependente),
    updateCurso: (curso: any, id: number) => restApi.put(`/cursos/${id}`, curso),
    updateInscricao: (inscricao: any, id: number) => restApi.put(`/inscricoes/${id}`, inscricao),

    deleteFuncionario: (funcionarioId: any) => restApi.delete(`/funcionarios/${funcionarioId}`),
    deleteDependente: (dependenteId: any) => restApi.delete(`/dependentes/${dependenteId}`),
    deleteCurso: (cursoId: any) => restApi.delete(`/cursos/${cursoId}`),
    deleteInscricao: (inscricaoId: any) => restApi.delete(`/inscricoes/${inscricaoId}`),
};

export default api;