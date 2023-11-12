"""add_new_answer_index_column_answers_table

Revision ID: 5cf87e4f6409
Revises: a0546565ced6
Create Date: 2023-11-11 08:47:13.102084

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '5cf87e4f6409'
down_revision: Union[str, None] = 'a0546565ced6'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('answers', sa.Column('answer_index', sa.Integer, nullable=True))


def downgrade() -> None:
    op.drop_column('answers', 'answer_index')
