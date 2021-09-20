import couchdb 
couch = couchdb.Server()
db = couch['researchdb']
doc = {'user_name': 'high_score': 'num_of_deaths', 'completion_time'}
db.save(doc)
('e0658cab843b59e63c8779a9a5000b01', '1-4c6114c65e295552ab1019e2b046b10e')
doc {'_rev': '1-4c6114c65e295552ab1019e2b046b10e', 'user_name': 'high_score', 'num_of_deaths', 'completion_time', '_id': 'e0658cab843b59e63c8779a9a5000b01'}
