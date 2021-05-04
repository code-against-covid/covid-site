from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('form/', include('form.urls')),
    path('resource/', include('resource.urls')),
    path('state/', include('state.urls')),
    path('status/', include('status.urls')),
    path('organization/', include('organization.urls')),
    path('announcement/', include('announcement.urls')),
]


urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
