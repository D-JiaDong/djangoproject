"""djangoproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
# from sysapp.views import login,submitLogin,linkto,restlink
# from loginapp.views import userlogin
import authapp.views as  authview
import sysapp.views as sysview
import blogapp.views as blogview
urlpatterns = [
    #框架自带管理系统
    path('admin/', admin.site.urls),
    # 映射 第一个login不唯一 决定url格式
    # path('test/',login),
    # path('slogin/',submitLogin),
    # path('linkto/',linkto),
    # path('reslink/<int:userid>/<str:userage>/', restlink),
    # path('',userlogin),

    path('',authview.index),
    path('login/', authview.gologin),
    path('newuser/', authview.goNewUser),
    path('regnewuser/', authview.reNewUser),
    path('slogin/', authview.login),
    path('checkUserName/',authview.checkUserName),
    path('userlist/', sysview.getUserList),
    path('goclasslist/',blogview.goBlogClass),
    path('classlist/', blogview.getBlogClass),

]
