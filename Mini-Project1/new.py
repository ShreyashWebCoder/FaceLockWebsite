from flask import Flask, render_template, request, redirect, url_for
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            filename = file.filename
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('index'))

@app.route('/create_folder', methods=['POST'])
def create_folder():
    if request.method == 'POST':
        folder_name = request.form['folder_name']
        if folder_name:
            os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'], folder_name))
            return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
