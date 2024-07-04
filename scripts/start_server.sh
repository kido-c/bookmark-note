cd /home/ubuntu/bookmark-note
pm2 stop all
pm2 start npm --name "bookmark-note" -- start