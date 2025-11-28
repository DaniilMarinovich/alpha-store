import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { IconButton } from '@mui/material';
import classes from './ProductCard.module.css';

export default function ProductCard({
  id,
  title,
  price,
  image,
  isLiked,
  onOpen,
  onToggleLike,
  onDelete,
  onEdit,
}) {
  return (
    <div
      className={classes.card}
      onClick={onOpen}>
      <IconButton
        className={classes.likeButton}
        onClick={e => {
          e.stopPropagation();
          onToggleLike(id);
        }}
        sx={{
          color: isLiked ? 'var(--accent-color)' : 'var(--text-primary)',
        }}>
        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>

      <div className={classes.imageBox}>
        <img
          src={image}
          alt={title}
          className={classes.image}
        />
      </div>

      <div className={classes.contentBox}>
        <p className={classes.title}>{title}</p>

        <div className={classes.footer}>
          <IconButton
            onClick={e => {
              e.stopPropagation();
              onDelete(id);
            }}
            size="small"
            sx={{
              color: 'var(--text-primary)',
              opacity: 0.6,
              '&:hover': { opacity: 1, color: '#d32f2f' },
            }}>
            <DeleteOutlineIcon />
          </IconButton>

          <IconButton
            onClick={e => {
              e.stopPropagation();
              onEdit(id);
            }}
            size="small"
            sx={{
              color: 'var(--text-primary)',
              opacity: 0.6,
              '&:hover': { opacity: 1, color: 'blue' },
            }}>
            <EditIcon />
          </IconButton>

          <p className={classes.price}>{price} $</p>
        </div>
      </div>
    </div>
  );
}
