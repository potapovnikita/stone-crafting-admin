const gulp = require('gulp');
const GulpSSH = require('gulp-ssh')

const config = {
  host: '31.31.196.159',
  port: 22,
  username: 'u0507339',
  password: 'J7f99gc8ldRggEKg',
}

const gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config
})

// деплой сборки в прод
gulp.task('deploy:production', function () {
  return gulp
  .src(['dist/**/*'])
  .pipe(gulpSSH.dest('www/admin.stone-crafting.com/'))
})