from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('form/', include('form.urls')),
    path('status/', include('status.urls')),
    path('organization/', include('organization.urls')),
    path('announcement/', include('announcement.urls')),
    path('api-auth/', include('rest_framework.urls'))
]


urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
