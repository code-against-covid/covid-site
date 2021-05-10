from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django_otp.admin import OTPAdminSite
from django.contrib.auth.models import User
from django_otp.plugins.otp_totp.models import TOTPDevice
from django_otp.plugins.otp_totp.admin import TOTPDeviceAdmin


class OTPAdmin(OTPAdminSite):
    pass


# if you are implementing this to an existing project, you might notice that when you enforce 2FA you wont see the previous models
# the problem is that the register part only register the OTP model and users

# you need to register all the admin model classes in the new admin_page
# do this with:
# for model_cls, model_admin in admin.site._registry.items():
#    otp_admin_site.register(model_cls, model_admin.__class__)

admin_site = OTPAdmin(name='OTPAdmin')
for model_cls, model_admin in admin.site._registry.items():
    admin_site.register(model_cls, model_admin.__class__)

urlpatterns = [
    path('unitedagainstcovidadminpanellogin/', admin_site.urls),
    path('form/', include('form.urls')),
    path('status/', include('status.urls')),
    path('organization/', include('organization.urls')),
    path('announcement/', include('announcement.urls')),
    path('team/', include('team.urls'))
]


urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
