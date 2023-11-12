"""add_new_column_to_question_groups_table

Revision ID: abf9eda831f9
Revises: 5cf87e4f6409
Create Date: 2023-11-12 12:14:55.756713

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'abf9eda831f9'
down_revision: Union[str, None] = '5cf87e4f6409'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('question_groups', sa.Column('name', sa.String(256), nullable=True))
    op.add_column('question_groups', sa.Column('paragraph', sa.String(500), nullable=True))
    op.add_column('question_groups', sa.Column('image', sa.String(500), nullable=True))


def downgrade() -> None:
    op.drop_column('question_groups', 'title')
    op.drop_column('question_groups', 'paragraph')
    op.drop_column('question_groups', 'image')
