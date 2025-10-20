import {FastifyInstance, FastifyPluginOptions} from "fastify";

export default async function ParameterRoute(fastify:FastifyInstance,options:FastifyPluginOptions){

	
	fastify.post('/settings',{
		schema:{
		
		}
	})
}