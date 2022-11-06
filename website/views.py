from django.shortcuts import render
from django.core.mail import send_mail
from dentist import settings

# Create your views here.

def index(request):
    if request.method == "POST":
        message_name = request.POST['message-name']
        message_email = request.POST['message-email']
        message = request.POST['message']


        form_data ={
        'message_name': message_name,
        'message_email': message_email,
        'message': message,
        }
        message = '''
        From:\n\t\t{}\n
        Message:\n\t\t{}\n
        Email:\n\t\t{}\n
        '''.format(form_data['message_name'], form_data['message'], form_data['message_email'])

        
        
        send_mail(
            'You got a mail',
            message,
            '',
            ['essteeooh@gmail.com'],
            fail_silently=False
        )

        return render(request, 'index.html', {'message_name': message_name})
    
    else:
       return render(request, 'index.html', {})

