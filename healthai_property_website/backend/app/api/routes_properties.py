from fastapi import APIRouter
from app.db.mongo import db
from bson import ObjectId

router = APIRouter(prefix='/api', tags=['properties'])

@router.get('/properties')
async def list_properties(limit: int = 20):
    cursor = db.properties.find().limit(limit)
    res = []
    async for doc in cursor:
        doc['_id'] = str(doc['_id'])
        res.append(doc)
    return res

@router.post('/properties/seed')
async def seed_demo():
    demo = [
        {'title':'Modern Flat - 2BHK','price':4500000,'area':850,'location':'Downtown','type':'flat'},
        {'title':'Independent House - 4BHK','price':15000000,'area':2400,'location':'Suburb','type':'house'},
        {'title':'Residential Plot - 500 ft²','price':1200000,'area':500,'location':'Outskirts','type':'land'}
    ]
    await db.properties.delete_many({})
    await db.properties.insert_many(demo)
    return {'ok': True}
