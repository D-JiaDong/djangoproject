from .basedao import BaseDao
class UserDao(BaseDao):
    def login(self,username,password):
        # 直接拼接sql语句 会导致sql注入
        sql="select* from t_book where username='"+username+"'and "+"userpwd='"+password+"'"
        self.execute(sql)
        resultSet=self.fetch()
        return resultSet
        pass

    def createUser(self, params=[]):
        sql = "insert    into t_user (username, password, userphone, userpic,userintro) values(%s,%s,%s,%s,%s);"
        print(sql)
        result = self.execute(sql,params)
        return result
    #参数化
    def loginParams(self, params):
        # 直接拼接sql语句 会导致sql注入
        sql = "select* from t_user where username=%s and password=%s"
        self.execute(sql,params)
        resultSet = self.fetch()
        return resultSet

    def findUserByUserName(self,params):
        sql = "select* from t_user where username=%s "
        print(sql)
        self.execute(sql, params)
        resultSet = self.fetch()
        return resultSet
        pass

    def findUserByUserId(self, params):
        sql = "select* from t_user where userid=%s "
        print(sql)
        self.execute(sql, params)
        resultSet = self.fetch()
        return resultSet[0]
        pass

    #查询所有用户
    def findPageUserList(self,params={}):
        sql = "select* from t_user where 1=1" #%s是占位符
        searchParams=[]
        if params.get('userName'):
            sql+=' and username like %s'
            searchParams.append('%'+params.get('userName')+'%')
        if params.get('userPhone'):
            sql+=' and userphone like %s'
            searchParams.append('%'+params.get('userPhone')+'%')
        if params.get('userState'):
            sql+=' and userstate=%s'
            searchParams.append(params.get('userState'))
        sql+=' limit '+str(params.get('startRow'))+','+str(params.get('pageSize'))
        self.execute(sql,searchParams)
        resultSet = self.fetch()
        return resultSet
        pass

    #查询数量
    def findUserCounts(self,params=[]):
        sql = "select count(*) as counts from t_user where 1=1"  # %s是占位符
        searchParams = []
        if params.get('userName'):
            sql += ' and username like %s'
            searchParams.append('%' + params.get('userName') + '%')
        if params.get('userPhone'):
            sql += ' and userphone like %s'
            searchParams.append('%' + params.get('userPhone') + '%')
        if params.get('userState'):
            sql += ' and userstate=%s'
            searchParams.append(params.get('userState'))

        self.execute(sql, searchParams)
        resultSet = self.fetch()
        return resultSet[0]['counts']
        pass

    #删除用户s
    def removeUser(self,params):
        sql="delete from t_user where userid=%s"
        result=self.execute(sql,params)
        self.commit()
        return result
        pass

    def updateUser(self,params=[]):
        print(params)
        sql = "update t_user set userphone=%s, userpic=%s, userintro=%s where userid=%s"  # %s是占位符
        result=self.execute(sql,params)
        if result==1:
            print("修改成功")
        self.commit()
        return result
        pass


